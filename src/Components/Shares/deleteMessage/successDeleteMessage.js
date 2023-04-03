import Swal from "sweetalert2";

const successDeleteMessage = () => {
    Swal.fire({
        title: 'Deleted !',
        text: 'Your data has been deleted.',
        icon: 'success',
        background: "#40073B",
        color: "#EACAE8",
        timer: 5000,
      });
};

export default successDeleteMessage;