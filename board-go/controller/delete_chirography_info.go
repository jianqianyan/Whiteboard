package controller

import (
	"github.com/jianqianyan/Whiteboard/board-go/dao"
	"github.com/jianqianyan/Whiteboard/board-go/repository"
	"github.com/jianqianyan/Whiteboard/board-go/service"
)

func ReleaseDelete(body dao.Body) (error, repository.Status) {
	return service.ReleaseDelete(body)
}
