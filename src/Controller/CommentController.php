<?php

namespace App\Controller;

use DateTime;
use App\Entity\Article;
use App\Entity\Comment;
use App\Repository\UserRepository;
use App\Repository\ArticleRepository;
use App\Repository\CommentRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\RouterInterface;

class CommentController extends AbstractController
{
    /*
    #[Route('/comment', name: 'app_comment')]
    public function index(): Response
    {
        return $this->render('comment/index.html.twig', [
            'controller_name' => 'CommentController',
        ]);
    }
*/



#[Route('/ajax/comments', name: 'comment_add', methods: ['POST'])]

public function add  (?Request $request, EntityManagerInterface $em, ArticleRepository $articleRepository, CommentRepository $commentRepository, UserRepository $userRepository): Response
{
        $commentData = $request->request->all('comment');

        //dd($commentData);

        if(!$this->isCsrfTokenValid( 'comment-add', $commentData['_token'])) {
            return $this->json( [
                    'code' => 'INVALID_CSRF_TOKEN'
                ] ,  Response::HTTP_BAD_REQUEST);
        }

        $article = $articleRepository->findOneBy(['id' => $commentData['article']]);

        if(!$article) {
            return $this->json([
                'code' => 'ARTICLE_NOT_FOUND'],
                Response::HTTP_BAD_REQUEST);             
        }

        $comment = new Comment($article);
        $comment->setContent($commentData['content']);
        $comment->setUser($userRepository->findOneBy(['id' => '1']));
        $comment->setCreatedAt(new DateTime());

        dd($comment);
       $em->persist($comment);
       $em->flush();

        $html = $this->renderView('comment/index.html.twig', [
            'comment' => $comment
        ]);

        return $this->json([
            'code' => 'COMMENT_ADDED_SUCCESSFULLY' ,
            'message' => $html,
            'numberOfComments' => $commentRepository->count(['article' => $article ])
        ]);
        /*
        return $this->render('comment/index.html.twig', [
            'controller_name' => 'CommentController',
        ]);
        */
}

}

