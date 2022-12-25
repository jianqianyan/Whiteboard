package service

import (
	"crypto/rand"
	"errors"
	"fmt"
	"math/big"

	"github.com/jianqianyan/Whiteboard/board-go/repository"
)

var OnceBoardId = make(chan int, 1)
var id int64 = 0

const letterBytes = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

func RandStringBytes(n int) string {
	b := make([]byte, n)
	for i := range b {
		x := new(big.Int).SetInt64(int64(62))
		n, _ := rand.Int(rand.Reader, x)
		b[i] = letterBytes[n.Int64()]
	}
	return string(b)
}
func GetId() string {
	OnceBoardId <- 1
	id += 1
	Id := fmt.Sprintf("%08d", id)
	<-OnceBoardId
	return Id
}
func ReleaseCreateIdByUserId(userId string) (error, repository.Status, string) {
	return NewCreateIdFlowByUserId(userId).Do()
}
func NewCreateIdFlowByUserId(user_id string) *CreateBoardIdFlow {
	board_id := RandStringBytes(4) + GetId() + RandStringBytes(4)
	return &CreateBoardIdFlow{
		userId:  user_id,
		boardId: board_id,
		Param:   "userId",
		ParamId: user_id,
	}
}
func ReleaseCreateIdByBoardId(userId string) (error, repository.Status, string) {
	return NewCreateIdFlowByBoardId(userId).Do()
}
func NewCreateIdFlowByBoardId(board_id string) *CreateBoardIdFlow {
	user_id := RandStringBytes(4) + GetId() + RandStringBytes(4)
	return &CreateBoardIdFlow{
		userId:  user_id,
		boardId: board_id,
		Param:   "boardId",
		ParamId: board_id,
	}
}

type CreateBoardIdFlow struct {
	userId  string
	boardId string
	Param   string
	ParamId string
	board   *repository.Board
}

func (f *CreateBoardIdFlow) Do() (error, repository.Status, string) {
	f.packBoardInfo()
	if err, status := f.checkParm(); err != nil {
		return err, status, ""
	}
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
func (f *CreateBoardIdFlow) checkParm() (error, repository.Status) {
	if f.ParamId == "" {
		return errors.New(fmt.Sprintf("%s不能为空", f.Param)), 406
	}
	return nil, 200
}
