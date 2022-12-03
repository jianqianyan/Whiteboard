package dao

type Body struct {
	Data    string
	UserId  int64
	BoradId int64
}

func (f *Body) Do() error {
	return nil
}
