package service

import (
	"math/rand"
	"strconv"
	"time"

	"github.com/jianqianyan/Whiteboard/board-go/repository"
)

const letterBytes = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

func RandStringBytes(n int) string {
	b := make([]byte, n)
	for i := range b {
		b[i] = letterBytes[rand.Intn(len(letterBytes))]
	}
	return string(b)
}

func ReleaseCreateBoardId(userId string) (error, repository.Status, string) {
	return NewCreateBoardIdFlow(userId).Do()
}
func NewCreateBoardIdFlow(user_id string) *CreateBoardIdFlow {
	board_id := RandStringBytes(2) + strconv.FormatInt(time.Now().Unix(), 10) + RandStringBytes(2)
	return &CreateBoardIdFlow{
		userId:  user_id,
		boardId: board_id,
	}
}

type CreateBoardIdFlow struct {
	userId  string
	boardId string
	board   *repository.Board
}

func (f *CreateBoardIdFlow) Do() (error, repository.Status, string) {
	f.packBoardInfo()
	if err, status := repository.CreateBoard(f.board); err != nil {
		return err, status, ""
	}
	return nil, 200, f.boardId
}
func (f *CreateBoardIdFlow) packBoardInfo() {
	f.board = &repository.Board{
		UserId:  f.userId,
		BoardId: f.boardId,
	}
}
