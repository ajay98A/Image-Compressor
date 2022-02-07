import { useState } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@material-ui/core/Box";
import imageCompression from "browser-image-compression";
import Alert from "@mui/material/Alert";
import "./App.css";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const imageStyle = {
  width: "440px",
  height: "400px",
  background: "50% 50% no-repeat",
  backgroundSize: "cover",
};
function App() {
  const [originalImage, setOriginalImage] = useState("");
  const [originalFileName, setOriginalFileName] = useState("");
  const [compressedImage, setCompressedImage] = useState("");
  const [fileName, setFileName] = useState("");

  const handle = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      var pattern = /image-*/;

      if (!file.type.match(pattern)) {
        alert("Invalid format");
        return 0;
      }
    }
    const imageFile = e.target.files[0];
    setOriginalImage(imageFile);
    setOriginalFileName(URL.createObjectURL(imageFile));
    setFileName(imageFile.name);
  };

  const handleCompress = (e) => {
    e.preventDefault();
    const options = {
      maxSizeMB: 1,
    };
    if (options.maxSizeMB >= originalImage / 1024) {
      alert("Too small image !");
      return 0;
    }
    let output;
    imageCompression(originalImage, options).then((x) => {
      output = x;
      const downloadLink = URL.createObjectURL(output);
      setCompressedImage(downloadLink);
    });
  };

  var setSrc1, setSrc2;
  if (originalFileName) {
    setSrc1 = originalFileName;
  } else {
    setSrc1 =
      "https://png.pngtree.com/png-vector/20190223/ourmid/pngtree-vector-picture-icon-png-image_695350.jpg";
  }
  if (compressedImage) {
    setSrc2 = compressedImage;
  } else {
    setSrc2 =
      "https://png.pngtree.com/png-vector/20190223/ourmid/pngtree-vector-picture-icon-png-image_695350.jpg";
  }
  return (
    <div>
      <h1 className="heading">Image Compressor</h1>
      <Grid container spacing={2}>
        <Box ml={30} mt={5} mr={15}>
          <Grid item>
            <img src={setSrc1} style={imageStyle} />
          </Grid>
        </Box>

        <Box mt={5} mr={15}>
          <Grid item>
            <img src={setSrc2} style={imageStyle} />
          </Grid>
        </Box>
      </Grid>

      <Box ml={40} pt={3} mt={5} mr={5}>
        <Button
          variant="contained"
          component="label"
          style={{ marginLeft: "200px", marginRight: "30px" }}
        >
          Upload File
          <input
            type="file"
            accept="images/*"
            onChange={(e) => handle(e)}
            hidden
          />
        </Button>
        <Button
          variant="contained"
          onClick={(e) => handleCompress(e)}
          style={{ marginRight: "30px" }}
        >
          Compress
        </Button>
        <Button
          variant="contained"
          disabled={!compressedImage}
          href={compressedImage}
          target="_blank"
          download={fileName}
          style={{ marginRight: "30px" }}
        >
          Download
        </Button>
      </Box>
    </div>
  );
}

export default App;
