import os
import sys
import unittest

# Add the directory containing client.py to the Python path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'py')))

from client import remoteProcedureProtocol, loadJsonDict

class TestClient(unittest.TestCase):

    def test_remote_procedure_protocol(self):
        server_address = ('tmp/socket_file')

        # get test json file path list
        test_json_files = os.listdir('test/input')
        
        for file in test_json_files:
            with self.subTest(file=file):
                test_file_path = os.path.join('test/input', file)
                expected_output_json = loadJsonDict(os.path.join('test/output', file))
                self.assertEqual(remoteProcedureProtocol(server_address, test_file_path), expected_output_json)

if __name__ == '__main__':
    unittest.main()