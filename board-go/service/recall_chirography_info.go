package service

import "github.com/jianqianyan/Whiteboard/board-go/repository"

func ReleaseRecall() (error, repository.Status) {
	return repository.RecalChirography()
}
