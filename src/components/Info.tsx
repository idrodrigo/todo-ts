import { styled } from 'styled-components'

export const Info: React.FC = () => {
  return (
    <InfoDiv>
      <p>
        Double-click to edit a todo
      </p>
      <p>
        <a href="https://www.idrodrigo.com/">
          © Rho 2023
        </a>, all rights reserved
      </p>
    </InfoDiv>
  )
}

const InfoDiv = styled.div`
  margin: 65px auto 0;
  color: #4d4d4d;
  font-size: 11px;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);
  text-align: center;

p {
  line-height: 1;
}

a {
  color: inherit;
  text-decoration: none;
  font-weight: 400;
}

a:hover {
  text-decoration: underline;
}
`
