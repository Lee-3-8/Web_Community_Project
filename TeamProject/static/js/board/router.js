import * as MAIN from "./main.js";
import * as EVENT from "./event.js";
import * as ASIDE from "./aside/main.js";
import * as LIST from "./list/index.js"
import * as EVENT_LIST from "./list/event.js"

/*===========URL 라우팅 형식=========
게시판 메인화면 : /post#board_id#postmain
게시글 클릭시 : /post#board_id#postinfo#post_id
검색 클릭 : /post#board_id#search#data...
===================================*/

/*====================================
hashValue[0] : 값없음 ,
 [1] : 게시판 id
 [2] : 화면구분
 [3] : 게시판 클릭시의 게시글 아이디 or 검색데이터
 =======================================*/
async function router() {
  try {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    }); //맨위로
    const hashValue = location.hash.split('#');
    const router_map = {
      postmain: function () { //게시판별 메인페이지
        LIST.loading_post_title(hashValue);
        LIST.loading_post(hashValue);
        ASIDE.loading_best_post();
        EVENT.handle_search();
        window.addEventListener('scroll', EVENT_LIST.handle_scrollHeight);
        return 'postmain';
      },
      postinfo: function () { //게시글 크게보기
        window.removeEventListener('scroll', EVENT_LIST.handle_scrollHeight);
        LIST.loading_post_title(hashValue);
        MAIN.load_postinfo(hashValue);
        ASIDE.loading_best_post();
        EVENT.handle_search();
        return 'postinfo';
      },
      search: function () {
        LIST.loading_search_result(hashValue); //전체게시판검색이면 board_id가 total\
        ASIDE.loading_best_post();
        EVENT_LIST.attach_event_when_title_click();
        EVENT.handle_search();
        window.addEventListener('scroll', EVENT_LIST.handle_scrollHeight);
        return 'search';
      }

    }
    router_map[hashValue[2]]() //구분된 hash부분 맵핑
  } catch (error) {
    console.log(error);
    alert("페이지를 찾지못했습니다");
    //404 페이지 구현
  }
}

window.addEventListener('DOMContentLoaded', router); //처음불러올때 감지
window.addEventListener('hashchange', router); //hash  url이 이동되면 감지