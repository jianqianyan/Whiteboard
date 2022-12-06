package service

import (
	"github.com/jianqianyan/Whiteboard/board-go/dao"
	"github.com/jianqianyan/Whiteboard/board-go/repository"
)

func ReleaseDelete(body dao.Body) (error, repository.Status) {
	eg := newChirographyFlow(body)
	if err, status := checkParm(eg); err != nil {
		return err, status
	}
	return nil, 200
}
