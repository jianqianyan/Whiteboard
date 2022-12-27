package controller

import (
	"github.com/jianqianyan/Whiteboard/board-go/repository"
	"github.com/jianqianyan/Whiteboard/board-go/service"
)

func ReleaseCreateBoardId(userId string) (error, repository.Status, string) {
	return service.ReleaseCreateIdByUserId(userId)
}
func ReleaseCreateUserId() (error, repository.Status, string) {
	return service.ReleaseCreateUserId()
}
