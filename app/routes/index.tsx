import { useLoaderData } from 'remix';
import { KakaoMap } from '../components/kakaoMap/kakaoMap';

export default function Index() {
  const data = useLoaderData();
  
  return (
    <KakaoMap>
    </KakaoMap>
  );
}
