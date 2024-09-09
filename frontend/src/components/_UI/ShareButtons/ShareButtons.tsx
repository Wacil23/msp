import {
  BsFacebook,
  BsInstagram,
  BsTwitterX,
  BsWhatsapp,
} from "react-icons/bs";

export const ShareButtons = () => {
  const articleUrl = "https://docmsp.fr/blog"; // URL de l'article à partager
  const message = encodeURIComponent("Découvrez cet article incroyable !");

  return (
    <>
      <BsFacebook
        size={20}
        className="cursor-pointer"
        onClick={() => {
          window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${articleUrl}`,
            "_blank",
          );
        }}
      />
      <BsTwitterX
        size={20}
        className="cursor-pointer"
        onClick={() => {
          window.open(
            `https://twitter.com/intent/tweet?url=${articleUrl}&text=${message}`,
            "_blank",
          );
        }}
      />
      <BsInstagram
        size={20}
        className="cursor-pointer"
        onClick={() => {
          window.open("https://www.instagram.com/", "_blank"); // Redirige vers Instagram
        }}
      />
      <BsWhatsapp
        size={20}
        className="cursor-pointer"
        onClick={() => {
          window.open(
            `https://wa.me/?text=${message}%20${articleUrl}`,
            "_blank",
          );
        }}
      />
    </>
  );
};
