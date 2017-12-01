
export const fetchReads = () => (
  $.ajax({
    method: "get",
    url: "api/reads"
  })
);

export const createRead = (articleId) => (
  $.ajax({
    method: "post",
    url: "api/reads",
    data: { read: { article_id: article_id } }
  })
);

export const deleteRead = (article_id) => (
  $.ajax({
    method: "delete",
    url: "api/reads",
    data: { read: { article_id: article_id } }
  })
)
