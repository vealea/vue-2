import axios from 'axios'

export const fetchImg = () => {
  return axios({
    url: 'http://8.138.58.77:8806/gdufe/image/pageImage/1/5000'
  });
};


export const fetchTreeData = (guanliid) => {
  console.log(`http://8.138.58.77:8806/gdufe/tree/pageTree/${guanliid}/1/300`)
  return axios({
    method: 'get',
    url: `http://8.138.58.77:8806/gdufe/tree/pageTree/${guanliid}/1/300`
  });
};

export const fetchfaTreeData = () => {
  console.log(`http://8.138.58.77:8806/gdufe/tree/pageTree//1/300`)
  return axios({
    method: 'get',
    url: `http://8.138.58.77:8806/gdufe/tree/pageTree//1/300`
  });
};

export const addTreeData = (formData) => {
  return axios({
    method: 'post',
    url: 'http://8.138.58.77:8806/gdufe/tree/admin/addTree',
    data: {...formData}
  });
};



export const editTreeData = (formData) => {
  return axios({
    method: 'post',
    url: 'http://8.138.58.77:8806/gdufe/tree/admin/editTree',
    data: {...formData}
  });
};

export const getAllMessages = () => {
  return axios({
    method: 'get',
    url: 'http://8.138.58.77:8806/gdufe/message/getAllMessage',
  });
};

export const removeMessage = (messageId) => {
  return axios({
    method: 'delete',
    url: `http://8.138.58.77:8806/gdufe/message/admin/removeMessage/${messageId}`,
  });
};



export const getList = (dataurl, page, limit) => {
  console.log(`${dataurl}/${page}/${limit}`)
  return axios.get(`${dataurl}/${page}/${limit}`);
};

export const deleteTreeByIds = (ids) => {
  return axios({
    method: 'delete',
    url: 'http://8.138.58.77:8806/gdufe/tree/admin/deleteTreeByIds',
    data: [ids]
  });
};