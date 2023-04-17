interface ListInt {
  author?: string,
  authorIconSrc?: string,
  commentCount?: number,
  date?: string,
  favCount?: string,
  id?: string,
  likeCount?: string,
  playCount?: string,
  poster?: string,
  videoSrc?: string,
  videoTitle?: string,
}

export interface recommendInt {
  commentCount: string,
  desc: string,
  id: string,
  imgSrc: string,
  link: string,
  playCount: string,
  videoSrc: string
}

export interface commentInt {
  avatar: string,
  content: string,
  date: string,
  id: string,
  username: string,
}

export class InitData {
  list: ListInt = {
    author: '',
    authorIconSrc: '',
    commentCount: 0,
    date: '',
    favCount: '',
    id: '',
    likeCount: '',
    playCount: '',
    poster: '',
    videoSrc: '',
    videoTitle: '',
  }
  recommendList: recommendInt[] =[]
  commentList: commentInt[] =[]
}
