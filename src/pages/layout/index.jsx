import SearchAppBar from "../../components/appBar";


export const Layout = ({children}) => {
  return <div>
    <header><SearchAppBar /></header>
    <main>{children}</main>
    <footer>Footer content</footer>
  </div>;
}  