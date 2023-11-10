import { IPFSUploadResponse, getFetchableUrl, uploadDirectory } from 'ipfs-service'
import React from 'react'

import { ArtworkType } from 'src/modules/create-dao/components/Artwork/ArtworkForm.schema'
import { sanitizeFileName } from 'src/utils/sanitize'

export interface IPFSUpload {
  name: string
  webkitRelativePath: string
  ipfs: IPFSUploadResponse | null
  trait: string
  type?: string
  content?: File
  blob?: Blob | string
}

export interface ImageProps {
  cid?: string
  name: string
  // trait: string
  uri: string
  url?: string
  path?: string
  content?: File
  blob?: Blob | string
}

export interface ArtworkUploadError {
  maxTraits?: string
  mime?: string
  directory?: string
  dimensions?: string
}

export interface UseArtworkUploadProps {
  artwork: ArtworkType[]
  ipfsUpload: IPFSUpload | undefined
  isUploadingToIPFS: boolean
  onUploadStart: () => void
  onUploadSuccess: (ipfs: IPFSUpload) => void
  onUploadError: (error: Error) => void
}

export const useArtworkUpload = ({
  artwork,
  ipfsUpload,
  isUploadingToIPFS,
  onUploadStart,
  onUploadSuccess,
  onUploadError,
}: UseArtworkUploadProps) => {
  const [uploadArtworkError, setUploadArtworkError] = React.useState<
    ArtworkUploadError | undefined
  >()
  const [ipfsUploadError, setIpfsUploadError] = React.useState<boolean>(false)

  /*   assign ipfs upload to property  */
  const image = React.useMemo(() => {

    if (isUploadingToIPFS) return

    if (Array.isArray(ipfsUpload) && artwork.length) {
      return ipfsUpload.reduce((acc: ImageProps, upload) => {
        const index = artwork?.map((e: any) => e.trait).indexOf(upload.trait)
        const childIndex = artwork[index]?.properties.indexOf(upload.name)
        const childName = artwork[index]?.properties[childIndex]

        acc = {
          // trait: artwork[index]?.trait,
          name: childName,
          cid: upload?.ipfs?.cid || '',
          uri: upload?.ipfs?.uri || '',
          url: encodeURI(
            getFetchableUrl(upload?.ipfs?.uri) +
              `/${sanitizeFileName(
                upload.webkitRelativePath.split('/').slice(1).join('/')
              )}` || ''
          ),
          path: upload.webkitRelativePath,
          content: upload?.content,
          blob: upload?.blob,
        }
        return acc
      }, [])
    }

    return []
  }, [artwork, ipfsUpload, isUploadingToIPFS])

  /* prepare files */

  const [isProcessing, setIsProcessing] = React.useState<boolean | undefined>(undefined)

  const [file, setFile] = React.useState<File | null>(null);

  const [files, setFiles] = React.useState<FileList | null>(null)
  // const [filesArray, setFilesArray] = React.useState<File[] | null>(null)
  const fileInfo = React.useMemo(() => {
    if (!file) return;
    // if (!files) return

    setIsProcessing(true)
    // const filesArray = Array.from(files).filter((file) => file.name !== '.DS_Store')
    const acceptableMIME = ['image/png', 'image/svg+xml']

    let collectionName: string = ''
    let fileType: string = ''
    let traits: {
      trait: string
      properties: string[]
    }[] = []

    const fr = new FileReader()
      fr.readAsDataURL(file)
      const getImageSize = (fr: FileReader) => {
        let img = new Image()
        img.src = fr.result?.toString() || ''
        img.onload = function () {
          let height = img.height
          let width = img.width
          let min = 600

          if ((height < min || width < min) && file.type !== 'image/svg+xml') {
            setUploadArtworkError({
              dimensions: `we recommend images of min, 600px width x height, your images are width: ${width} x ${height} px`,
            })
            return
          }

          if (height !== width) {
            setUploadArtworkError({
              dimensions: `images must be of equal height and width, your images are width: ${width} x ${height} px`,
            })
            return
          }
        }
      }
      fr.onload = () => getImageSize(fr)


    // const reduced = filesArray.reduce((acc: any = [], cv, index) => {
    //   // const paths = cv.webkitRelativePath.split('/')
    //   const path = filesArray[0].name;

    //   const collection = path;
    //   const currentTrait = sanitizeFileName(path)


    //   const currentProperty = sanitizeFileName(path)

      /*  set collection name and file type */
      // if (!collectionName) {
      //   collectionName = path
      // }

      // if (!fileType) {
      //   fileType = cv.type
      // }

      // /*  construct traits and properties  */
      // if (traits.filter((trait) => trait.trait === currentTrait).length === 0) {
      //   traits.push({ trait: currentTrait, properties: [] })
      // }

      // if (!!traits) {
      //   traits
      //     .filter((trait) => trait.trait === currentTrait)[0]
      //     ?.properties?.push(currentProperty)
      // }


      /* handle errors */

      // forward slashes seem to be converted to `:`
      // check for both folder and file name
      // if (
      //   cv.name.includes(':') ||
      //   path?.includes(':') ||
      //   cv.name.split('.').length !== 2 ||
      //   path.split('.').length !== 1
      // ) {
      //   setUploadArtworkError({
      //     directory: `file or folder naming incorrect. must not include forward slashes or periods.`,
      //   })
      //   return
      // }

      // if (path.length !== 3 || !path) {
      //   if (path.length > 3) {
      //     setUploadArtworkError({
      //       directory: `file or folder naming incorrect. must not include back slashes.`,
      //     })
      //     return
      //   }

      //   setUploadArtworkError({
      //     directory: `folder structure is incorrect. download the nouns example folder to compare.`,
      //   })
      //   return
      // }

    //   if (cv.type.length && !acceptableMIME.includes(cv.type)) {
    //     setUploadArtworkError({
    //       mime: `${cv.type} is an unsupported file type - file: ${cv.name}`,
    //     })
    //     return
    //   }

    //   if (traits.length > 10) {
    //     setUploadArtworkError({
    //       maxTraits: `Maximum of 10 traits per collection. Your upload includes ${traits.length} traits.`,
    //     })
    //     return
    //   }

    //   if (filesArray[index - 1 > 0 ? index - 1 : 0].type !== cv.type) {
    //     setUploadArtworkError({
    //       mime: `All file types must be the same.`,
    //     })
    //     return
    //   }

    //   /* get image size */
    //   const fr = new FileReader()
    //   fr.readAsDataURL(cv)
    //   const getImageSize = (fr: FileReader, count: number) => {
    //     let img = new Image()
    //     img.src = fr.result?.toString() || ''
    //     img.onload = function () {
    //       let height = img.height
    //       let width = img.width
    //       let min = 600

    //       if ((height < min || width < min) && cv.type !== 'image/svg+xml') {
    //         setUploadArtworkError({
    //           dimensions: `we recommend images of min, 600px width x height, your images are width: ${width} x ${height} px`,
    //         })
    //         return
    //       }

    //       if (height !== width) {
    //         setUploadArtworkError({
    //           dimensions: `images must be of equal height and width, your images are width: ${width} x ${height} px`,
    //         })
    //         return
    //       }

    //       if (count === filesArray?.length - 1) {
    //         setIsProcessing(false)
    //       }
    //     }
    //   }
    //   fr.onload = () => getImageSize(fr, filesArray.indexOf(cv))

    //   acc.push({
    //     collection,
    //     trait: currentTrait,
    //     traitProperty: currentProperty,
    //     file: cv,
    //   })

    //   return acc
    // }, [])

    const filesArr : File[] = [];
    filesArr.push(file);

    return {
      filesLength: 1,
      fileType,
      collectionName,
      traits,
      fileArray: filesArr,
    }
  }, [file])

  React.useEffect(() => {
    if (isProcessing === false) {
      setFile(file);

      // setFilesArray(filesArray)
    }
  }, [isProcessing, fileInfo])

  /* upload Files to ipfs via zora ipfs service */

  const uploadToIPFS = async (file: File | null): Promise<IPFSUpload> => {
    const ipfsUploadResponse = await uploadDirectory(
      [{
        content: file!,
        path: file!.name
      }] 
      // files.map((file) => ({
      //   content: file,
      //   path: file.name,
      // })),
      // { cache: false }
    )
    
    return {
      name: sanitizeFileName(file!.name),
      property: file!.name,
      collection: file!.name,
      trait: file!.name,
      path: file!.webkitRelativePath,
      content: file!,
      blob: URL.createObjectURL(file!),
      webkitRelativePath: file!.webkitRelativePath,
      type: file!.type,
      ipfs: ipfsUploadResponse,
    } as IPFSUpload
  } 

    // return files.map((file) => ({
    //   name: sanitizeFileName(file.name),
    //   property: file.name,
    //   collection: file.name,
    //   trait: file.name,
    //   path: file.webkitRelativePath,
    //   content: file,
    //   blob: URL.createObjectURL(file),
    //   webkitRelativePath: file.webkitRelativePath,
    //   type: file.type,
    //   ipfs: ipfsUploadResponse,
    // }))
  React.useEffect(() => {

    if (!file || !!uploadArtworkError) return

    // if (!filesArray || !!uploadArtworkError) return

    const handleUpload = async (file: File) => {
      // const files = filesArray.filter((file) => file.name !== '.DS_Store')
      try {
        onUploadStart()
        const ipfs = await uploadToIPFS(file)

        onUploadSuccess(ipfs)

      } catch (err) {


        setIpfsUploadError(true)
        onUploadError(err as Error)
        return
      }
    }

    handleUpload(file)
  }, [file, uploadArtworkError])


  const emptyFileArr: File[] = [];

  return {
    image,
    setFiles,
    setFile,
    fileInfo,
    emptyFileArr,
    uploadArtworkError,
    setUploadArtworkError,
    ipfsUploadError,
  }
}
