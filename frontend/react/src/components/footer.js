import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import Button from "@mui/material/Button";
import useMediaQuery from "@mui/material/useMediaQuery";
export default function Footer() {
  const matches = useMediaQuery("(min-width:600px)");
  if (matches) {
    return (
      <footer
        style={{
          display: "flex",
          justifyContent: "space-around",
          backgroundColor: "rgb(25,118,210)",
          color: "white",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <div>
          <a>2022@all right reserved.</a>
        </div>
        <div>
          <YouTubeIcon />
          <TwitterIcon />
          <FacebookIcon />
        </div>
        <div>
          <a>Contact Us</a>
          <a>Privacy Policy</a>
          <a>Help</a>
        </div>
      </footer>
    );
  } else {
    return (
      <footer
        style={{
          textAlign: "center",
          backgroundColor: "black",
          color: "white",
        }}
      >
        <div>
          <YouTubeIcon />
          <TwitterIcon />
          <FacebookIcon />
        </div>
        <div>
          <a>Contact Us</a>
          <a>Privacy Policy</a>
          <a>Help</a>
        </div>
        <div>
          <a>2022@all right reserved.</a>
        </div>
      </footer>
    );
  }
}
