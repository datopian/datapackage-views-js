import Table from '../src/Table'

export default {
  component: Table,
  props: {
		data: [
      ['foo', 'bar', 'baz'],
      [1,2,3],
      [2,3,4],
      [4,5,6]
	  ]
  }
};
