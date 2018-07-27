import { serialize } from 'react-serialize';
import hash from 'object-hash';

const calcKey = obj => hash(JSON.parse(serialize(obj)));

export default calcKey;
