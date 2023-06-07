let posts = [];

const TITLE_VALIDATION_LIMIT = 100;
const TEXT_VALIDATION_LIMIT = 200;
const RESET_TITLE_INPUT = 'Осталось 100 символов для заголовка';
const RESET_TEXT_INPUT = 'Осталось 200 символов для текста поста';

const postTitleInputNode = document.querySelector('.js-post-title-input');
const postTextInputNode = document.querySelector('.js-post-text-input');
const postsNode = document.querySelector('.js-posts');
const titleValidationNode = document.querySelector('.js-title-validation');
const textValidationNode = document.querySelector('.js-text-validation');
const newPostBtnNode = document.querySelector('.js-new-post-btn');
const disabledPostBtnNode = document.querySelector('.js-btn_disabled')
const resetBlogBtnNode = document.querySelector('.js-reset-post-btn');

function getPostFromUser() {
   const title = postTitleInputNode.value;
   const text = postTextInputNode.value;
   const options = {hour: 'numeric', minute: 'numeric'};
   const date = new Date().toLocaleDateString();
   const time = new Date().toLocaleTimeString([], options);

   return {
      title,
      text,
      date,
      time
   };
}

function addPost({title, text, date, time}) {
   posts.push({
      title,
      text,
      date,
      time
   });
   return
};

function getPosts() {
   return posts;
}

function renderPosts() {
   const posts = getPosts();

   let postsHTML = '';
   
   posts.forEach((post) => {
      postsHTML += `
      <div class='post'>
         <p class='post__date'>${post.date} ${post.time}</p>
         <p class='post__title'>${post.title}</p>
         <p class='post__text'>${post.text}</p>
      </div>`
   });
   postsNode.innerHTML = postsHTML;
}

function clearInput() {
   postTitleInputNode.value = '';
   postTextInputNode.value = '';
   titleValidationNode.innerText = RESET_TITLE_INPUT;
   textValidationNode.innerText = RESET_TEXT_INPUT;
}

function resetBlog() {
   posts = [];
   renderPosts();
   clearInput();
}

function validation() {
   const titleLen = postTitleInputNode.value.length;
   const textLen = postTextInputNode.value.length;
   
   if (titleLen <= TITLE_VALIDATION_LIMIT) {
      titleValidationNode.innerText = `Осталось ${TITLE_VALIDATION_LIMIT - titleLen} символов для заголовка`;
      titleValidationNode.classList.remove('color_red');
   } else {
      titleValidationNode.innerText = `Заголовок не должен превышать ${TITLE_VALIDATION_LIMIT} символов`;
      titleValidationNode.classList.add('color_red');
   }

   if (textLen <= TEXT_VALIDATION_LIMIT) {
      textValidationNode.innerText = `Осталось ${TEXT_VALIDATION_LIMIT - textLen} символов для текста поста`;
      textValidationNode.classList.remove('color_red');
   } else {
      textValidationNode.innerText = `Текст не должен превышать ${TEXT_VALIDATION_LIMIT} символов`;
      textValidationNode.classList.add('color_red');
   }
};

function buttonDisabled() {
   if (postTitleInputNode.value.length > 0 && postTextInputNode.value.length > 0) {
      newPostBtnNode.removeAttribute('disabled');
   } else {
      newPostBtnNode.setAttribute('disabled', 'disabled');
      newPostBtnNode.classList.add('btn-disabled');
   }

   if(postTitleInputNode.value.length > 100) {
      newPostBtnNode.setAttribute('disabled', 'disabled');
   } 

   if(postTextInputNode.value.length > 200) {
      newPostBtnNode.setAttribute('disabled', 'disabled');
   }
};

function publishPostBtn() {
   const postFromUser = getPostFromUser();
   addPost(postFromUser);

   renderPosts();

   clearInput();

   buttonDisabled();
};

function resetBlogBtn() {
   resetBlog();
};

newPostBtnNode.addEventListener('click', publishPostBtn);
resetBlogBtnNode.addEventListener('click', resetBlogBtn);
postTitleInputNode.addEventListener('input', validation);
postTextInputNode.addEventListener('input', validation);
disabledPostBtnNode.addEventListener('input', buttonDisabled);

