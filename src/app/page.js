import NewLinkForm from './NewLinkForm'
import LinkList from './LinkList'

const LinksPage = () => {
  return (
    <div>
      <h1>Create a new link</h1>
      
      <NewLinkForm />

      <h1>View existing links</h1>
      
      <LinkList />
    </div>
  )
}

export default LinksPage
