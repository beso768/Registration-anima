const form = $("#registration-form");

form.submit((e) => {
  e.preventDefault();
  validation();
});
const inputs = form.children();

// $(".field")[item].val(function (index, currentvalue) {
//   console.log(index, currentvalue);
// })

// const validation = () => {
//   console.log($("#selectbox2").val());
//   if(
//     $("#selectbox2").val() ||
//   )
// };

const empty = (index) => {
  console.log(index);
};
