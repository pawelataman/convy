package services

import (
	"bytes"
	"converter/pb"
	"image"
	"io"
	"log"
)

type ConverterService struct {
}

func (cs *ConverterService) Convert(stream pb.ConverterService_UploadServer) (io.Reader, string, error) {
	imageBuffer := new(bytes.Buffer)

	st, err := stream.Recv()
	if err != nil {
		return nil, "", err
	}

	fileName, sourceFormat, targetFormat := st.FileName, st.SourceFormat, st.TargetFormat
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

	return imageBuffer, fileName, nil

}

func decodeImage(sourceFormat string, imageReader *io.Reader) (image.Image, error) {
	switch sourceFormat {
	case "jpg":
	case "jpeg":
		{
			image.Decode(*imageReader)
		}
	}
}
