
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import FactSubmissionForm from "@/components/FactSubmissionForm";
import factCheckImage from "@/assets/images/fact-check.svg";

const Submit = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <section className="pt-32 px-6 flex-1 bg-gradient-to-b from-background to-muted/30">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
            <div className="text-center md:text-left md:flex-1">
              <h1 className="text-3xl font-bold mb-4">
                Submit a Claim for Fact-Checking
              </h1>
              <p className="text-muted-foreground">
                Help us combat AI misinformation by submitting claims for our expert team to analyze. 
                We'll verify the information and add it to our database.
              </p>
            </div>
            
            <div className="md:flex-1 flex justify-center">
              <img 
                src={factCheckImage} 
                alt="Fact Checking Process" 
                className="max-w-full h-auto rounded-lg shadow-md"
                style={{maxHeight: "250px", width: "auto"}}
              />
            </div>
          </div>
          
          <FactSubmissionForm />
        </div>
      </section>
      
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Submit;
