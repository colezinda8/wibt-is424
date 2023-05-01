function r_e(id) {
  return document.querySelector(`#${id}`);
}
// eventbtn.addEventListener("click", () => {
//   event_modal.classList.add("is-active");
// });

// event_modalbg.addEventListener("click", () => {
//   event_modal.classList.remove("is-active");
//   r_e("event_form").reset();
// });

// //add new events
// event_submit.addEventListener("click", () => {
//   let title = document.querySelector("#title").innerHTML;
//   let date = document.querySelector("#date").innerHTML;
//   let hour = document.querySelector("#hour").innerHTML;
//   let minute = document.querySelector("#minute").innerHTML;
//   let ampm = document.querySelector("#ampm").innerHTML;
//   let time = hour + " " + minute + " " + ampm;

//   let new_event = {
//     Title: title,
//     Date: date,
//     Time: time,
//   };
//   db.collection("events").add(new_event);

//   db.collection("events")
//     .get()
//     .then((response) => {
//       let element = response.docs;
//       element.forEach((e) => {
//         console.log(e.data().Title);
//       });
//     });
// });

// //create editing
// function edit_doc(id1) {
//   event_modal.classList.add("is-active");
//   db.collection("events")
//     .where(id, "==", id1)
//     .get()
//     .then((response) => {
//       let e = response.docs;
//       let title = e.data().Title;
//       let time = e.data().Time;
//       let date = e.data().Date;
//       let newTime = time.split(" ");
//       document.querySelector("#title").innerHTML = title;
//       document.querySelector("#date").innerHTML = date;
//       document.querySelector("#hour").innerHTML = newTime[0];
//       document.querySelector("minute").innerHTML = newTime[1];
//       document.querySelector("ampm").innerHTML = newTime[2];
//     });
//   db.collection("events")
//     .doc(id)
//     .delete()
//     .then(() => {
//       console.log("Previous event has been deleted");
//     });
// }
// edit_doc("mEokhz4zCIpNBY9MXrq7");

//onclick deletion function
