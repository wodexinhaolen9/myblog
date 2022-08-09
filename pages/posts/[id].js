import { GraphQLClient, gql } from 'graphql-request'
const client = new GraphQLClient("https://api-ap-northeast-1.hygraph.com/v2/cl6lsx6ia0y7l01ulhpjshdti/master")

const IDLIST = gql`
  {
    posts {
      id
    }
  }
`
const QUERY = gql`
  query ($id: ID!) {
    post(where: { id: $id }) {
      id
      title
      datePublished
      author {
        name
        avatar {
          url
        }
      }
      coverImg {
        url
      }
      content {
        html
      }
    }
  }
`

export async function getStaticPaths () {
  const { posts } = await client.request(IDLIST)
  return {
    paths: posts.map((post) => ({ params: { id: post.id } })),
    fallback: false
  }
}
export async function getStaticProps ({ params }) {
  const data = await client.request(QUERY, { id: params.id })

  return {
    props: {
      post: data.post,
    },
    revalidate: 10
  }
}

export default function Post ({ post }) {
  return <div className='blog'>
    <p>{post.title}</p>
    <p>{post.datePublished}</p>
    <p>By{post.author.name}</p>
    <img src={post.coverImg.url} alt="" />
    <p dangerouslySetInnerHTML={{ __html: post.content.html }}>

    </p>
  </div>
}