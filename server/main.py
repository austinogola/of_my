import hashlib
import time
import requests

final_time = str(int(round(time.time())))
print(f'final time is {final_time}')
print(f'final time length is {len(final_time)}')

msg='si ni wale walikataa kabisa'
message=msg.encode('utf-8')
print(f'Encoded message time is {message}')

dynamicRules = requests.get(
            'https://raw.githubusercontent.com/DATAHOARDERS/dynamic-rules/main/onlyfans.json').json()

hash_object = hashlib.sha1(message)
sha_1_sign = hash_object.hexdigest()
print(f'sha_1_sign) is {sha_1_sign}')
# print(type(sha_1_sign))
sha_1_b = sha_1_sign.encode("ascii")

print(f'sha_1_b is {sha_1_b}')

# print((dynamicRules["checksum_constant"]))
# print((dynamicRules["checksum_indexes"]))

checksum = (sum([sha_1_b[number] for number in dynamicRules["checksum_indexes"]])+ dynamicRules["checksum_constant"])

print(checksum)
# print(sha_1_b)
# print([sha_1_b[number] for number in dynamicRules["checksum_indexes"]])

letter="6636:{}:{:x}:63c19c1a".format('manner',500)

print(letter)
