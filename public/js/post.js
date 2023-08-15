const tagListContainer = $('.tag-list');
const postContainer = $('.post-container');
const postContent = $('.post-content');
const postTitle = $('.post-title');
const userName = $('.user-name');
const userDescription = $('.user-description');
const createdAt = $('.created-date');
const userImg = $('.user-image img');
const postURL = window.location;
const postId = new URL(postURL).searchParams.get("id");

console.log(postId);

// 날짜 포매팅
function toDate(date) {
    let yyyy = date.substring(0, 4);
    let mm = date.substring(4, 6);
    let dd = date.substring(6, 8);

    let stringNewDate = new Date(yyyy, mm, dd);
    stringNewDate.setDate(stringNewDate.getDate());

    return stringNewDate.getFullYear() +
        "-" + ((stringNewDate.getMonth() + 1) > 9 ? (stringNewDate.getMonth() + 1).toString() : "0" + (stringNewDate.getMonth() + 1)) +
        "-" + (stringNewDate.getDate() > 9 ? stringNewDate.getDate().toString() : "0" + stringNewDate.getDate().toString());
}

// 사이드바 태그 리스트
function toTagList(tags) {
    let tagTemplate = "";

    tags.forEach(tag => {
        tagTemplate = tagTemplate + `<li class="list-group-item skill-tag"
        data-tag="${tag.name}" data-tag-id="${tag.id}">#${tag.name}</li>`;
    });

    return tagTemplate;
}

$.get(ServerURL + `/api/tech/post?techPostId=${postId}`).then((post) => {
    postTitle.html(post.title);
    userName.html(post.user.name);
    userDescription.html(post.user.description);
    createdAt.html(toDate(post.createdAt));
    userImg.attr('src', `${post.user.imgUrl}`);
    postContent.append(post.detail);
})

$.get(ServerURL + '/api/tech/skillTags').then((tag) => {
    tag = toTagList(tag)
    tagListContainer.html('');
    tagListContainer.append(tag);

    $('.tag-list .skill-tag').click(function (e) {
        let tagId = e.target.dataset.tagId;
        window.location.assign('/post/skillTagId?=' + tagId);
    })
})