import Swal from "sweetalert2";

const errorDeleteMessage = (error) => {
    Swal.fire({
        icon:"error",
        title: "You have an error",
        text:error ,
        background: "#40073B",
        color: "#EACAE8",
        timer: 6000,
       });
};

export default errorDeleteMessage;