package service

import (
	"github.com/jianqianyan/Whiteboard/board-go/dao"
	"github.com/jianqianyan/Whiteboard/board-go/repository"
)

func ReleaseUpdate(body dao.Body) error {
	eg := newChirographyFlow(body)
	if err := checkParm(eg); err != nil {
		return err
	}
	if err := repository.UpdateChirography(eg); err != nil {
		return err
	}
	return nil
}
