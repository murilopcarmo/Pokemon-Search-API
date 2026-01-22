import SearchAppBar from "../../components/appBar";


export const Layout = ({children}) => {
  return <div>
    <SearchAppBar />
    <main>{children}</main>
    <footer>Footer content</footer>
  </div>;
}  