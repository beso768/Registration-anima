// initialize options list
const listArr = [
  "თბილისი",
  "აფხაზეთი",
  "აჭარა",
  "გურია",
  "იმერეთი",
  "კახეთი",
  "მცხეთა-მთიანეთი",
  "რაჭა-ლეჩხუმი და ქვემო სვანეთი",
  "სამეგრელო-ზემო სვანეთი",
  "სამცხე-ჯავახეთი",
  "ქვემო ქართლი",
  "შიდა ქართლი",
];
listArr.map((item) => {
  $(`<option value=${item}>${item}</option>`).appendTo($("#selectbox2"));
});
$("select").each(function () {
  // Cache the number of options
  let $this = $(this),
    numberOfOptions = $(this).children("option").length;

  // Hides the select element
  $this.addClass("s-hidden");

  // Wrap the select element in a div
  $this.wrap('<div class="select"></div>');

  $this.after('<div class="styledSelect"></div>');

  let $styledSelect = $this.next("div.styledSelect");

  $styledSelect.text($this.children("option").eq(0).text());

  // Insert an unordered list after the styled div and also cache the list
  let $list = $("<ul />", {
    class: "options",
  }).insertAfter($styledSelect);

  // Insert a list item into the unordered list for each select option
  for (let i = 0; i < numberOfOptions; i++) {
    $("<li />", {
      text: $this.children("option").eq(i).text(),
      rel: $this.children("option").eq(i).val(),
    }).appendTo($list);
  }

  let $listItems = $list.children("li");

  $styledSelect.click(function (e) {
    e.stopPropagation();
    $("div.styledSelect.active").each(function () {
      $(this).removeClass("active").next("ul.options").hide();
    });
    $(this).toggleClass("active").next("ul.options").toggle();
  });

  // Hides the unordered list when a list item is clicked and updates the styled div to show the selected list item
  // Updates the select element to have the value of the equivalent option
  $listItems.click(function (e) {
    e.stopPropagation();
    $styledSelect.text($(this).text()).removeClass("active");
    $this.val($(this).attr("rel"));
    $list.hide();
    if ($this.val() === "სხვა") {
      $("#other").css("display", "flex");
    } else {
      $("#other").css("display", "none");
    }
    if ($this.val() !== "") {
      const wrapper = $this.closest(".field");
      wrapper.removeClass("incorrect");
      wrapper.find(".error-message").text("");
    }
    console.log($this.val());
  });

  // Hides the unordered list when clicking outside of it
  $(document).click(function () {
    $styledSelect.removeClass("active");
    $list.hide();
  });
});
