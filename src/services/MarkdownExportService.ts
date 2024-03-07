import axios from "axios";
import authAxios from "../helpers/authAxios";

export class MarkdownExportService {
  static export = (text: string, format: string) => {
    return authAxios
      .post(`/markdown/export`, { text, format }, { responseType: "blob" })
      .then((response) => {
        // create file link in browser's memory
        const blob = new Blob([response.data]);
        const href = URL.createObjectURL(blob);

        // create "a" HTML element with href to file & click
        const link = document.createElement("a");
        link.href = href;
        link.setAttribute("download", `file.${format}`); //or any other extension
        document.body.appendChild(link);
        link.click();

        // clean up "a" element & remove ObjectURL
        document.body.removeChild(link);
        URL.revokeObjectURL(href);
      });
  };
}
