import { firestore, auth } from '../components/firebaseConfig';
import '../setupTests'


describe('Firebase configuration', () => {
  it('should have initialized Firestore', () => {
    expect(firestore).toBeDefined();
  });

  it('should have initialized Authentication', () => {
    expect(auth).toBeDefined();
  });
});
