import * as Sentry from '@sentry/nextjs'
import { FormikProps } from 'formik'
import { motion } from 'framer-motion'
import React, { BaseSyntheticEvent, ChangeEventHandler, ReactElement } from 'react'

import { ArtworkPreview, ArtworkUpload as UploadComponent } from 'src/components/Artwork'
import { LayerOrdering } from 'src/components/Artwork/LayerOrdering'
import { artworkPreviewPanel } from 'src/components/Fields/styles.css'
import { IPFSUpload, useArtworkPreview, useArtworkUpload } from 'src/hooks'

import { useFormStore } from '../../stores'

const previewVariants = {
  closed: {
    left: 0,
    top: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    x: '-105%',
    opacity: 0,
    transition: {
      animate: 'easeInOut',
    },
  },
  open: {
    x: 0,
    opacity: 1,
    transition: {
      animate: 'easeInOut',
      duration: 0.5,
    },
  },
}

interface ArtworkFormProps {
  id: string
  value: any
  inputLabel: string | ReactElement
  onChange: ChangeEventHandler
  onBlur: ChangeEventHandler
  formik?: FormikProps<any>
  errorMessage?: any
  helperText?: string
}

export const ArtworkUpload: React.FC<ArtworkFormProps> = ({
  inputLabel,
  helperText,
  errorMessage,
  formik,
}) => {
  const {
    ipfsUpload,
    setSetUpArtwork,
    setUpArtwork,
    setIpfsUpload,
    isUploadingToIPFS,
    setIsUploadingToIPFS,
    orderedLayers,
    setOrderedLayers,
  } = useFormStore()
  const { artwork } = setUpArtwork

  const handleUploadSuccess = (ipfs: IPFSUpload) => {
    console.log("success")
    setIpfsUpload(ipfs)
    setIsUploadingToIPFS(false)
  }

  const handleUploadError = async (err: Error) => {
    console.log("failure")

    console.log("e");

    // setIpfsUpload(undefined)
    setIsUploadingToIPFS(false)
    Sentry.captureException(err)
    await Sentry.flush(2000)
    return
  }

  const {
    image,
    fileInfo,
    emptyFileArr,
    ipfsUploadError,
    uploadArtworkError,
    setUploadArtworkError,
    setFiles,
    setFile
  } = useArtworkUpload({
    artwork,
    ipfsUpload,
    isUploadingToIPFS,
    onUploadStart: () => setIsUploadingToIPFS(true),
    onUploadSuccess: handleUploadSuccess,
    onUploadError: handleUploadError,
  })

  // const { generateStackedImage, imagesToDraw, generatedImages, canvas } =
  //   useArtworkPreview({
  //     images,
  //     orderedLayers,
  //   })

  const handleUpload = (e: BaseSyntheticEvent) => {

    console.log(e);
    setUploadArtworkError(undefined)
    setFile(e.currentTarget.files[0]);
    setFiles(e.currentTarget.files)
    setOrderedLayers([])
  }

  /*

    add artwork traits and properties to store

  */
  React.useMemo(() => {
    if (!fileInfo || !emptyFileArr || !fileInfo.traits || !formik || uploadArtworkError)
      return

    // setSetUpArtwork({
    //   ...formik.values,
    //   artwork: fileInfo.traits,
    //   filesLength: fileInfo.filesLength,
    // })
  }, [emptyFileArr || fileInfo, uploadArtworkError])

  /*

    generate Stacked Image on Init

  */
  const [isReady, setIsReady] = React.useState<boolean>(false)
  // React.useEffect(() => {
  //   setIsReady(!!setUpArtwork.artwork.length && !isUploadingToIPFS && !!imagesToDraw)
  // }, [setUpArtwork.artwork, isUploadingToIPFS, imagesToDraw])

  React.useEffect(() => {
    if (isReady && !isUploadingToIPFS) {
      // generateStackedImage()
    }
  }, [isReady, isUploadingToIPFS])

  const showPreview = setUpArtwork.artwork.length > 0

  const layerOrdering = (
    <LayerOrdering
      image={image}
      artwork={artwork}
      orderedLayers={orderedLayers}
      setOrderedLayers={setOrderedLayers}
    />
  )

  return (
    <>
      <UploadComponent
        inputLabel={inputLabel}
        fileCount={setUpArtwork.filesLength}
        traitCount={setUpArtwork.artwork.length}
        helperText={helperText}
        errorMessage={errorMessage}
        onUpload={handleUpload}
        ipfsUploadError={ipfsUploadError}
        uploadArtworkError={uploadArtworkError}
        image={image}
        fileType={fileInfo?.fileType}
        layerOrdering={layerOrdering}
      />
      {/* {showPreview && (
        <motion.div
          key={'preview-panel'}
          variants={previewVariants}
          initial={'closed'}
          animate={'open'}
          className={artworkPreviewPanel}
        >
          <ArtworkPreview
            canvas={canvas}
            generateStackedImage={generateStackedImage}
            images={images}
            generatedImages={generatedImages}
          />
        </motion.div>
      )} */}
    </>
  )
}
