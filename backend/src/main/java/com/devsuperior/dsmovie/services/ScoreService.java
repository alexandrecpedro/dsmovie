package com.devsuperior.dsmovie.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.dsmovie.dto.MovieDTO;
import com.devsuperior.dsmovie.dto.ScoreDTO;
import com.devsuperior.dsmovie.entities.Movie;
import com.devsuperior.dsmovie.entities.Score;
import com.devsuperior.dsmovie.entities.User;
import com.devsuperior.dsmovie.repositories.MovieRepository;
import com.devsuperior.dsmovie.repositories.ScoreRepository;
import com.devsuperior.dsmovie.repositories.UserRepository;

@Service
public class ScoreService {
	
	@Autowired
	private MovieRepository movieRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private ScoreRepository scoreRepository;
	
//	Save on Database
	@Transactional
	public MovieDTO saveScore(ScoreDTO dto) {
//		Recover an user from database based on email
		User user = userRepository.findByEmail(dto.getEmail());
		if (user == null) {
			user = new User();
			user.setEmail(dto.getEmail());
//			Save a new user and flush its data (bring the data)
			user = userRepository.saveAndFlush(user);
		}
		
//		findById(dto.getMovieId()) = returns an optional object
		Movie movie = movieRepository.findById(dto.getMovieId()).get();
		
//		Preparing an object called Score (User review from a movie)
		Score score = new Score();
		score.setMovie(movie);
		score.setUser(user);
		score.setValue(dto.getScore());
//		Saving the created object at database
		score = scoreRepository.saveAndFlush(score);	
		
		double sum = 0.0;
//		Accessing the list of reviews from an movie
		for (Score s : movie.getScores()) {
			sum += s.getValue();
		}
		
//		Average score from a movie review list
		double avg = sum / movie.getScores().size();
		
//		Setting the movie's average score
		movie.setScore(avg);
		movie.setCount(movie.getScores().size());
//		Saving at database
		movie = movieRepository.save(movie);
		
		return new MovieDTO(movie);
	}
}
