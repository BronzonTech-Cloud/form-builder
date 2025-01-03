import NavBar from "@/components/navbar";

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center px-4 md:px-6 lg:px-10 py-12">
        <h1 className="text-lg lg:text-2xl font-semibold text-center w-full">
          Welcome to Form Builder!
        </h1>
        <p className="text-base text-muted-foreground !text-center mt-4 w-full">
          Start creating and managing your forms using our form builder.
        </p>
      </div>
    </div>
  )
};

export default HomePage
