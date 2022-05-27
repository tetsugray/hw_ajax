const loadBtn = document.querySelector(".js-load");
const resultsContainer = document.querySelector(".js-results");
const searchInput = document.querySelector(".js-input");

loadBtn.addEventListener("click", function (evt) {
  evt.preventDefault()
  const searchValue = searchInput.value.trim().toLowerCase();
  fetch(`https://api.github.com/users/${searchValue}`)
  .then(response => response.json())
  .then(
    (data) =>
      (resultsContainer.innerHTML = `<div class="response-container">
                <img src="${data.avatar_url}">
                <p> Имя: <span>${data.name ? data.name : data.login}</span><p>
                <p> О себе: <span>${data.bio ? data.bio : 'не заполнено'}</span><p>
                <p> Кол-во репозиториев: <span>${data.public_repos}</span><p>
            </div>`)
  );
});

const postUrl = 'https://jsonplaceholder.typicode.com/posts'
const postBtn = document.querySelector('.post-load')
const idInput = document.querySelector(".id-input")

async function getPost (event) {
  event.preventDefault()
  try {
    const response = await axios.get(postUrl)
    const idValue = Number(idInput.value.trim())
    const postArr = []
    response.data.forEach((el) => {
      if (el.userId === idValue) {
        postArr.push(el)
      }
    })
    if (postArr.length === 0) {
      resultsContainer.innerHTML = '<div class="response-container">Нет постов или неверный id пользователя.</div>'
    } else {
      postArr.forEach((el) => {
        const post = `
          <div class="post-container">
            <p class="title">${el.title}</p>
            <p class="post-text">${el.body}</p>
          </div>
        `
        resultsContainer.insertAdjacentHTML('beforeend', post)
      })
      const postAmount = `
          <div class="post-container">
            <p class="title">post amount: ${postArr.length}</p>
          </div>
        `
      resultsContainer.insertAdjacentHTML('afterbegin', postAmount)
    }
  } catch (err) {
    console.error(err)
  }
}

postBtn.addEventListener('click', getPost)
