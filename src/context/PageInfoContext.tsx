import { createContext, useState } from 'react'

type InitialState = {
  title: string;
  description: string;
  metaDescription: string | null;
}

type ContextType = {
  pageInfo: InitialState,
  setPageInfo: React.Dispatch<React.SetStateAction<InitialState>>
}

interface PageInfoContextProviderType {
  children: JSX.Element
}

const initialState: InitialState = {
  title: '',
  description: '',
  metaDescription: null
}

export const PageInfoContext = createContext(initialState)

const PageInfoContextProvider: React.FC<PageInfoContextProviderType> = ({children}) => {
  
  const [pageInfo, setPageInfo] = useState<InitialState>(initialState)
  
  const value: ContextType = {pageInfo, setPageInfo}
  
  return (
    <PageInfoContext.Provider value={value}>
      {children}
    </PageInfoContext.Provider>
  )
  
}

export default PageInfoContextProvider


















// interface InitialState {
//   title: string,
//   description: string,
//   metaDescription: string | null,
// }
// 
// interface PageInfoContextProvider {
//   children: React.ReactNode
// }
// 
// type PageInfoStateType = [
//   pageInfo: InitialState,
//   setPageInfo: React.Dispatch<React.SetStateAction<InitialState>>
// ]
// 
// const initialState: InitialState = {
//   title: '',
//   description: '',
//   metaDescription: null,
// }
// 
// export const PageInfoContext = createContext(null)
// 
// const PageInfoContextProvider = ({children}: PageInfoContextProvider) => {
//   
//   const [pageInfo, setPageInfo] = useState<InitialState>(initialState)
//   
//   return (
//     <PageInfoContext.Provider value={[pageInfo, setPageInfo]}>
//       {children}
//     </PageInfoContext.Provider>
//   )
//   
// }
// 
// export default PageInfoContextProvider
// 









// interface StateInterface {
//   title: string,
//   description: string,
// }
// 
// interface PropsInterface {
//   children: JSX.Element
// }
// 
// interface UseStateInterface {
//   pageInfo: StateInterface,
//   setPageInfo: React.Dispatch<React.SetStateAction<StateInterface | ((prevState: StateInterface) => StateInterface)>>
// }
// 
// const initialState: StateInterface = {
//   title: '',
//   description: '',
// }
// 
// 
// export const PageInfoContext = createContext(null)
// 
// const PageInfoContextprovider: React.FC<PropsInterface> = ({children}) => {
//   
//   const [pageInfo, setPageInfo] = useState<UseStateInterface>(initialState)
//   
//   return (
//     <PageInfoContext.Provider value={[pageInfo, setPageInfo]}>
//       {children}
//     </PageInfoContext.Provider>
//   )
//   
// }
// 
// export default PageInfoContextprovider