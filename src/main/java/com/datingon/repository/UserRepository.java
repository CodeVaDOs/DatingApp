package com.datingon.repository;

import com.datingon.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends RepositoryInterface<User> {
    Optional<User> findUserByEmail(String email);

    @Query(value = "SELECT * FROM users u WHERE NOT EXISTS (SELECT * FROM grades g WHERE (g.user_received_id = u.id AND g.user_given_id = (?1)) AND u.id <> ?1) AND u.id <> ?1 AND u.avatar_url is not null LIMIT 5", nativeQuery = true)
    List<User> findAllSuggestionsByUserId(Long id);

    @Query(value = "SELECT *\n" +
            "FROM users u\n" +
            "WHERE u.id IN (SELECT a.user_received_id as id\n" +
            "               FROM grades a\n" +
            "                        JOIN grades b ON b.user_given_id = a.user_received_id AND a.user_given_id = b.user_received_id AND a.grade_type = 'LIKE' AND b.grade_type = 'LIKE'\n" +
            "               WHERE a.user_given_id = ?1\n" +
            "                 AND NOT EXISTS(SELECT uca.chat_room_id\n" +
            "                                FROM user_chat_rooms uca\n" +
            "                                         JOIN user_chat_rooms ucb ON uca.chat_room_id = ucb.chat_room_id\n" +
            "                                WHERE uca.user_id = a.user_given_id\n" +
            "                                  AND ucb.user_id = a.user_received_id))", nativeQuery = true)
    List<User> findAllMatchesByUserId(Long id);

//    @Query(value = "SELECT * FROM users u WHERE NOT EXISTS (SELECT * FROM grades g WHERE (g.user_received_id = u.id AND g.user_given_id = (?1)) AND u.id <> ?1) LIMIT 5", nativeQuery = true)
//    List<User> findAllMatchesByUserId(Long id);
}
