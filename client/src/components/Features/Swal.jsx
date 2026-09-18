import Swal from "sweetalert2";

const SwalAlert = ({
  title,
  text,
  icon = "success",
  confirmButtonText = "OK",
  ...props
}) => {
  return Swal.fire({
    title,
    text,
    icon,
    confirmButtonText,
    ...props,
  });
};

export default SwalAlert;
