import AnimatedPage from "@/components/AnimatedPage/AnimatedPage";
import MyDocument from "@/components/MyDocument";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";

export default function ResumePage() {
  return (
    <AnimatedPage>
      <div className={`w-full`}>
        <PDFViewer className={`w-full h-[100dvh]`}>
          <MyDocument />
        </PDFViewer>
        <PDFDownloadLink document={<MyDocument />} fileName="somename.pdf">
          {({ blob, url, loading, error }) =>
            loading ? "Loading document..." : "Download now!"
          }
        </PDFDownloadLink>
      </div>
    </AnimatedPage>
  );
}
