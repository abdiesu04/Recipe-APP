from collections import defaultdict
def solution(cards, moves, query):

    pos = {card[0]: [card[1], card[2]] for card in cards}
    cnt = defaultdict(int)

    for card in cards:
        cnt[card[2]] += 1

    for move in moves:
        id, start_row, start_col, end_row, end_col = move

        if id in pos:
            pos[id] = [end_row, end_col]

            for cid, (r, c) in pos.items():
                if c == start_col and r > start_row and cid != id:
                    pos[cid][0] -= 1

            for cid, (r, c) in pos.items():
                if cid != id and c == end_col and r >= end_row:
                    pos[cid][0] += 1

    if query in pos:
        return pos[query]
    else:
        for card in cards:
            if card[0] == query:
                return [card[1], card[2]]

    return []


cards=[[1,1,0],[3,0,0],[6,0,1],[4,0,2],[5,2,0],[7,1,1],[2,1,2]]
moves=[[6,0,1,2,0],[7,0,1,0,2]]
query=2
# Output: [2,2]
# Description: This is a case where a card is moved to the same column as the target. In this case, the target is not moved directly, but is moved down one row as the other card (card ID 7) is moved, so [2,2] is the correct value.

print(solution(cards , moves , query))