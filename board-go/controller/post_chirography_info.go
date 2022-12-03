package controller

import (
	"github.com/jianqianyan/Whiteboard/board-go/dao"
	"github.com/jianqianyan/Whiteboard/board-go/service"
)

func ReleasePost(body dao.Body) error {
	return service.ReleasePost(body)
}
