import { ToastContainer } from "./toast-container";

interface RootPageProps {
  children: React.ReactNode;
}

export default function RootPage({ children }: RootPageProps) {
  return (
    <ToastContainer>
      {children}
    </ToastContainer>
  )
}