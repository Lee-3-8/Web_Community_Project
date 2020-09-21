//보드 게시판 title 랜더링 
function render_board(board){
  const ele = document.querySelector('.post_title');
  ele.innerHTML = '';
  const tag = document.createElement('h1');
  const content =document.createTextNode(`${board.board_name} - 게시판`);
  tag.appendChild(content);
  ele.appendChild(tag);
}
function render_init(){
  const post = document.querySelector(".post");
  post.innerHTML = '';
  const post_input = get_htmlObject('div',['class'],['post_input']);
  const post_lists = get_htmlObject('div',['class'],['post_lists']);
  post.appendChild(post_input);
  post.appendChild(post_lists);
}
//post main 랜더링
function render_main(posts){
  const ele = document.querySelector('.post_lists');
  for (var i = 0; i <=posts.length-1; i++) {
    ele.appendChild(render_post(posts[i]));
  }

}
// 게시글들 랜더링 
// function render_post(post){
//   const post_html =   
//   `<section class=post_lists__item" id = "posts__${post.id}" onclick ="handle_postinfo()">`+
//   '<h4>'+post.subject+'</h4>'+ '<hr>'+
//   '<p>'+post.content+'</p>' +
//   '<ul>'+
//   `<li>${calc_date(post.create_date)}</li>`+
//   `<li>${post.userid}</li>`+ //댓글
//   `<li>${post.comment_num}</li>`+ //댓글
//   `<li>${post.like_num}</li>`+ //좋아요
//   '</ul>'+'</section>'; 
//   return post_html;
// }

function render_post(post){
  const temporary_example_img = "../static/img/among_icon.jpg";

  const section = get_htmlObject('section',['class','id'],["post__lists__item",`posts__${post.id}`]);
  section.addEventListener('click',handle_postinfo);

  const preview_img =get_htmlObject('img',['src','class'],[`${temporary_example_img}`,"post_preview"]);

  const div_component = get_htmlObject('div',['class'],['post_component']);

  const div_subject = get_htmlObject('div',['class'],['post_subject'],`${post.subject}`);

  const div_content = get_htmlObject('div',['class'],['post_content'],`${post.content}`);

  const div_others = get_htmlObject('div',['class'],['post_others']);

  const img_profile = get_htmlObject('img',['src','class'],[temporary_example_img,'post_profileImg']);
  const span_nickname = get_htmlObject('span',['class'],['post_nickname'],`${post.nickname}`);
  const span_date = get_htmlObject('span',['class'],['post_date'],calc_date(post.create_date));

  const span_like = get_htmlObject('span',['class'],['post_like']);
  const icon_like = get_htmlObject('i',['class'],["far fa-thumbs-up"]);
  const add_likeText = document.createTextNode(post.like_num);
  span_like.appendChild(icon_like);
  span_like.appendChild(add_likeText);

  const span_comment = get_htmlObject('span',['class'],["post_comment"]);
  const icon_comment = get_htmlObject('i',['class'],["far fa-comment"]);
  const add_CommentText = document.createTextNode(post.comment_num);
  span_comment.appendChild(icon_comment);
  span_comment.appendChild(add_CommentText);

  div_others.appendChild(img_profile);
  div_others.appendChild(span_nickname);
  div_others.appendChild(span_date);
  div_others.appendChild(span_like);
  div_others.appendChild(span_comment);

  div_component.appendChild(div_subject);
  div_component.appendChild(div_content);
  div_component.appendChild(div_others);

  section.appendChild(preview_img);
  section.appendChild(div_component);

  return section;


}

//로드된 추가 게시물 렌더링 
function render_newPost(posts){
  const ele = document.querySelector('.post_lists');
  for (var i = 0; i <=posts.length-1; i++) {
    ele.appendChild(render_post(posts[i]));
  }
}

//입력창 만들기//
function render_input(){
  const html = '<div class="input__on" id = "drag_drop"><input type="text" class="input__subject" maxlength="25" placeholder="글 제목을 입력해주세요" >' +
  '<textarea name="article" class="input__article" maxlength="800" placeholder="내용을 입력하세요"></textarea>' +
  '<div class = "input__buttons">'+
//file input에 label 붙임 
'<form method="post" enctype="multipart/form-data"><div class = "file_input">'+
'<label for="upload_file">'+
'<img src  = "https://img.icons8.com/small/32/000000/image.png"/></label>'+
'<input type="file" class = "input_file" id="upload_file" accept=".png, .jpg, .jpeg, .gif" multiple /></div>'+
  //accept 허용파일 , multilple  다수 파일입력가능 
  '<div class = "file_preview"> <img> </div></form>'+
  '<input type="button"  id = "button_submit" value="SUBMIT" />'+
  '<input type="button"  onclick="handle_inputOff();" value="X" /></div>'

  const ele = document.querySelector('.post_input');
  // ele.style.height=400 +'px'; //입력창 크기 변환
  ele.innerHTML = html;
  // if(ele!==null) {
  //   ele.style.height=400 +'px'; //입력창 크기 변환
  //   ele.innerHTML = html;
  //   // handle_keydown();
  // }
  // else{//새로고침했을때 애러
  //   handle_goMain();
  // }

}
function render_inputOff(){
  document.querySelector('.post_input').innerHTML = 
'<div class = "input__off"> <p>게시글을 작성해보세요</p></div>';
}

//게시글 상세보기 
function render_postinfo(post,userid){
  const post_ele = document.querySelector('.post');
  const lists =  document.querySelector('post_lists');
  const input = document.querySelector('.post_input');
  if(document.querySelector('post_info')){
    render_updatePostinfo(post);//postinfo수정창 -> postinfo 재조회 상황일경우
    return;
  }
  if(lists!==null)lists.parentNode.removeChild(lists);
  if(input!==null)input.parentNode.removeChild(input);

  const user_data = get_userdata(post.userid);

  const html = '<div class="post_info"><div class="info_maintext">'+
      '<div class="info_top">'+
        `<h1>${post.subject}</h1>` +
        '<div class="infoTop_buttons">'+
          '<input type="button" id = "updatePost__'+post.id+'" onclick="handle_update();" value="수정" />'+
          '<input type="button" id = "deletePost__'+post.id+'" onclick="handle_delete();" value="삭제" />'+
        '</div>' +
        '<div class = "infoTop_sub">'+
        `<img src="${user_data.image_url}">`+
          `<span class ="infoSub_nickname">${user_data.nickname}</span><span class ="infoSub_date">${calc_date(post.create_date)}</span>`+
        '</div>'+
      '</div>' +
      `<div class="info_article"><p>${post.content}</p><div class="info_img"></div></div>` +
      `<div class="info_writer"><img class = "infoWriter_img"src="${user_data.image_url}"><span class = "infoWriter_nickname">${user_data.nickname}</span> <span class =  "infoWriter_email">${user_data.email}</span> </div>` +
        '<div class="info_buttons">'+
        `<input type="button"  onclick="handle_report();" value="신고" />`+
        `<input type="button"  onclick="handle_likes();" id = "postinfo_likes_${post.id}"value="추천 ${post.like_num}" />`+
        '<input type="button"  onclick="handle_mail();" value="쪽지" />'+
        '<input type="button"  onclick="handle_goMain();" value="목록으로" />'+
    '</div>' +
    '</div>' +
    '<div class="comment">' +
      `<p class = "comment_num">${post.comment_num}개의 댓글 </p>`+
      '<div class="comment_input">'+
        '<textarea placeholder = "댓글을 입력해주세요 " class = "comment_value"></textarea>'+
        `<input type="button"  onclick="handle_commentInsert();" id = "comment_id_${post.id}"value="댓글작성" />`+
      '</div>' +
      '<div class="comment_list"></div>' +
    '</div></div>';
  post_ele.innerHTML = html;
  // render_postinfoImg(post.post_img_filename);
  if(user_data.userid != userid){
    document.querySelector('.infoTop_buttons').style.cssText = ' display: none';
  }//수정 삭제 그릴지 판단 
  if(post.post_img_filename !=null)render_postinfoImg([{'name' : 'test2_200912_223914.jpg'},
    {'name' : 'test2_200912_220223.jpg'},
    {'name' : 'test_200912_220223.png'},
    {'name' : 'test_200912_223914.png'},
    {'name' : 'loading.gif'}]);
}
//게시글 이미지 렌더링
function render_postinfoImg(imgs){
  const ele = document.querySelector('.info_img');
  let img;
  for (var i = imgs.length - 1; i >= 0; i--) {
    img = get_htmlObject('img',['src','class'],[`http://127.0.0.1:5000/static/img/post_img/${imgs[i].name}`,`info_img_${imgs[i].id}`]);
    ele.appendChild(img);
  }

}

/*=============댓글 리스트 아이템 tag 생성 ==========*/
function render_commentList(comment,userid){
  const user_data = get_userdata(comment.userid);
  let comment_html ='<div class = "comment_item"><div class="comment_top">'+
    `<img src="${user_data.image_url}">`+
    `<div class = "comment_info">`+
      `<span class="comment_nickname">${user_data.nickname}</span>`+
      `<div class="comment_buttons1">`+
        `<input type="button"  id = "comment_likes_${comment.id}" onclick="handle_Commentlikes();" value="추천 ${comment.like_num}" />`+
        `<input type="button"  id = "comment_report_${comment.id}" onclick="handle_Commentreport();" value="신고" />`+
      '</div>'+
      `<span class="comment_date">${calc_date(comment.create_date)}</span>`+
    '</div>';

  if(user_data.userid == userid){
    comment_html =  comment_html + `<div class="comment_buttons2">`+
      `<input type="button" id = "updateComment__${comment.id}" onclick="handle_commentUpdate();" value="수정" />`+
      `<input type="button" id = "deleteComment__${comment.id}" onclick="handle_commentDelete();" value="삭제" />`+
    `</div>`;
  }//수정 삭제 그릴지 판단 
  comment_html = comment_html +'</div>'+
  `<p class="comment_content">${comment.content}</p><hr></div>`;   

  return comment_html;

}
/*=============댓글 리스트 랜더링==========*/
function render_comment(comments){
  let text ='';
  for (var i = 0; i <=comments.length-1; i++) {
    text += render_commentList(comments[i]);
  }
  document.querySelector('.comment_list').innerHTML = text;


}

//*==========게시글 postinfo , 수정창=========*/
function render_update(post){
  const user_data = get_userdata(post.userid);
  const tag = document.querySelector('.info_top');
  tag.innerHTML = '';
  tag.innerHTML = `<input type="text" value="${post.subject}" class="update_subject">` +
        '<div class="infoTop_buttons">'+
          '<input type="button" id = "updateSubmitPost__'+post.id+'" onclick="submit_updatePost();" value="완료" />'+
          '<input type="button" id = "deletePost__'+post.id+'" onclick="handle_delete();" value="삭제" />'+
        '</div>' +
        '<div class = "infoTop_sub">'+
        `<img src="${user_data.image_url}">`+
          `<span class ="infoSub_nickname">${user_data.nickname}</span><span class ="infoSub_date">${calc_date(post.create_date)}</span>`+
        '</div>';
  const tag2 = document.querySelector('.info_article');
  tag2.innerHTML = '';
  tag2.innerHTML = `<textarea name="article" class = "update_article">${post.content}</textarea>`;   
}

//=============수정후 postinfo 부분 랜더링 =============
const render_updatePostinfo=(post)=>{
  const user_data = get_userdata(post.userid);
  const tag = document.querySelector('.info_top');
  tag.innerHTML = '';
  tag.innerHTML =`<h1>${post.subject}</h1>` +
        '<div class="infoTop_buttons">'+
          '<input type="button" id = "updatePost__'+post.id+'" onclick="handle_update();" value="수정" />'+
          '<input type="button" id = "deletePost__'+post.id+'" onclick="handle_delete();" value="삭제" />'+
        '</div>' +
        '<div class = "infoTop_sub">'+
        `<img src="${user_data.image_url}">`+
          `<span class ="infoSub_nickname">${user_data.nickname}</span><span class ="infoSub_date">${calc_date(post.create_date)}</span>`+
        '</div>';
  const tag2 = document.querySelector('.info_article');
  tag2.innerHTML = '';
  tag2.innerHTML = `<p>${post.content}</p>`;   
}

////////////////////////////////////////////

function render_preview(curfiles , preview){//파일 업로드 미리보기

  const MAX_FILE = 5;
  if(curfiles.length > MAX_FILE){
    alert(`이미지는 최대 ${MAX_FILE}개 까지 등록가능합니다`);
    return;
  }
  while(preview.firstChild) {
    preview.removeChild(preview.firstChild); //이전의 미리보기 삭제

  }
  if(curfiles.length ===0){ //선택된 파일없을때
    alert('선택된 파일이없습니다.');
  }
  else{ //선택파일이 있을 경우 
    for(const file of curfiles){ //파일 목록 그리기 
      if(validFileType(file)){ //파일 유효성 확인 
        const image = document.createElement('img'); //미리보기 이미지 
        image.src = URL.createObjectURL(file);
        preview.appendChild(image); //이미지태그 그리기 

      }
      else alert('이미지파일만 업로드가능합니다');
    }
  }

}