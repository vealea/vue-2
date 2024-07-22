const intonly = {
  mounted(el) {
    el.addEventListener('input', (event) => {
      const value = event.target.value;
      event.target.value = value.replace(/\D/g, ''); 
    });
  },
};

export default intonly;