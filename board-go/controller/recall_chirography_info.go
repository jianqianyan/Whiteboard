package controller

import (
	"github.com/jianqianyan/Whiteboard/board-go/repository"
	"github.com/jianqianyan/Whiteboard/board-go/service"
)

func ReleaseRecall() (error, repository.Status) {
	return service.ReleaseRecall()
}
