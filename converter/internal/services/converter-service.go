package services

import (
	"bufio"
	"bytes"
	"converter/pb"
	"fmt"
	"image"
	"image/gif"
	"image/jpeg"
	_ "image/jpeg"
	"image/png"
	_ "image/png"
	"io"
	"log"
	"time"

	"golang.org/x/image/bmp"
	"golang.org/x/image/tiff"
)

type ConverterService struct {
}

type ImageCodec struct {
	Decode func(reader *io.Reader) (*image.Image, string, error)
}

func (cs *ConverterService) Convert(stream pb.ConverterService_UploadServer) (*bytes.Buffer, string, error) {
	imageBuffer := new(bytes.Buffer)

	st, err := stream.Recv()
	if err != nil {
		return nil, "", err
	}

	fileName, sourceFormat, targetFormat, chunk := st.FileName, st.SourceFormat, st.TargetFormat, st.Chunk

	imageBuffer.Write(chunk)
	for {
		req, err := stream.Recv()

		if err == io.EOF {
			break
		}
		if err != nil {
			if err == io.EOF {
				break
			} else {
				log.Fatal(err)
				break
			}
		}

		chunk := req.GetChunk()
		imageBuffer.Write(chunk)
	}

	decodedImage, err := decodeImage(sourceFormat, imageBuffer)

	if err != nil {
		log.Fatal(err)

		return nil, "", nil
	}

	encodedBuffer, err := encodeImage(decodedImage, targetFormat)

	if err != nil {
		log.Fatal(err)
		return nil, "", nil
	}

	return &encodedBuffer, fileName, nil

}

func decodeImage(sourceFormat string, imageReader io.Reader) (image.Image, error) {
	fmt.Println("started decoding image")
	timer := time.Now()

	defer func() {
		elapsed := time.Since(timer) / time.Millisecond
		fmt.Printf("finished decoding image in %d ms \n", elapsed)

	}()
	switch sourceFormat {
	case "jpg", "jpeg":
		{
			decoded, err := jpeg.Decode(imageReader)
			return decoded, err
		}
	case "png":
		{
			decoded, err := png.Decode(imageReader)
			return decoded, err
		}
	case "tiff", "tif":
		return tiff.Decode(imageReader)
	case "bmp":
		return bmp.Decode(imageReader)
	case "gif":
		return gif.Decode(imageReader)

	}
	return nil, fmt.Errorf("Unknown image format")

}

func encodeImage(decodedImage image.Image, targetFormat string) (bytes.Buffer, error) {
	fmt.Println("started encoding image")
	timer := time.Now()

	defer func() {
		elapsed := time.Since(timer) / time.Millisecond
		fmt.Printf("finished encoding image in %d ms \n", elapsed)

	}()
	var encodedImageBuffer bytes.Buffer

	encodeWriter := bufio.NewWriter(&encodedImageBuffer)

	switch targetFormat {
	case "jpg", "jpeg":
		{
			if err := jpeg.Encode(encodeWriter, decodedImage, nil); err != nil {
				return encodedImageBuffer, err
			}
			return encodedImageBuffer, nil
		}
	case "png":
		{
			if err := png.Encode(encodeWriter, decodedImage); err != nil {
				return encodedImageBuffer, err
			}
			return encodedImageBuffer, nil
		}
	case "tiff", "tif":
		{
			if err := tiff.Encode(encodeWriter, decodedImage, nil); err != nil {
				return encodedImageBuffer, err
			}
			return encodedImageBuffer, nil

		}
	case "bmp":
		{
			if err := bmp.Encode(encodeWriter, decodedImage); err != nil {
				return encodedImageBuffer, err
			}
			return encodedImageBuffer, nil
		}
	case "gif":
		{
			if err := gif.Encode(encodeWriter, decodedImage, nil); err != nil {
				return encodedImageBuffer, err
			}
			return encodedImageBuffer, nil
		}
	}
	return encodedImageBuffer, fmt.Errorf("Unknown image format")
}
