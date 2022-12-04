package dao

import (
	"time"

	"github.com/jianqianyan/Whiteboard/board-go/repository"
)

type Body struct {
	Data repository.Chirography
	Time time.Time
}
